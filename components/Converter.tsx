'use client'

import { useState, useCallback, useRef } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import styles from './Converter.module.css'

interface FileItem {
  id: string
  file: File
  status: 'pending' | 'converting' | 'done' | 'error'
  progress: number
  result?: {
    blob: Blob
    url: string
    originalSize: number
    convertedSize: number
  }
  error?: string
}

export default function Converter() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [quality, setQuality] = useState(85)
  const [isConverting, setIsConverting] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const generateId = () => Math.random().toString(36).substring(2, 9)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      f => f.type === 'image/png'
    )

    const newFiles: FileItem[] = droppedFiles.map(file => ({
      id: generateId(),
      file,
      status: 'pending',
      progress: 0
    }))

    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(
      f => f.type === 'image/png'
    )

    const newFiles: FileItem[] = selectedFiles.map(file => ({
      id: generateId(),
      file,
      status: 'pending',
      progress: 0
    }))

    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  const clearFiles = useCallback(() => {
    files.forEach(f => {
      if (f.result?.url) URL.revokeObjectURL(f.result.url)
    })
    setFiles([])
    setOverallProgress(0)
  }, [files])

  const convertFile = async (fileItem: FileItem): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Conversion failed'))
              return
            }

            const url = URL.createObjectURL(blob)
            resolve()
          },
          'image/webp',
          quality / 100
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(fileItem.file)
    })
  }

  const convertAll = async () => {
    if (files.length === 0 || isConverting) return

    setIsConverting(true)
    const total = files.length
    let completed = 0

    for (const fileItem of files) {
      if (fileItem.status === 'done') {
        completed++
        continue
      }

      setFiles(prev =>
        prev.map(f =>
          f.id === fileItem.id ? { ...f, status: 'converting' } : f
        )
      )

      try {
        const img = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) throw new Error('Canvas not available')

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error('Failed to load'))
          img.src = URL.createObjectURL(fileItem.file)
        })

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const blob = await new Promise<Blob | null>(resolve => {
          canvas.toBlob(resolve, 'image/webp', quality / 100)
        })

        if (!blob) throw new Error('Conversion failed')

        const url = URL.createObjectURL(blob)

        setFiles(prev =>
          prev.map(f =>
            f.id === fileItem.id
              ? {
                  ...f,
                  status: 'done',
                  result: {
                    blob,
                    url,
                    originalSize: fileItem.file.size,
                    convertedSize: blob.size
                  }
                }
              : f
          )
        )

        completed++
        setOverallProgress((completed / total) * 100)
      } catch (error) {
        setFiles(prev =>
          prev.map(f =>
            f.id === fileItem.id
              ? { ...f, status: 'error', error: 'Conversion failed' }
              : f
          )
        )
        completed++
        setOverallProgress((completed / total) * 100)
      }
    }

    setIsConverting(false)
  }

  const downloadFile = (fileItem: FileItem) => {
    if (!fileItem.result) return
    const link = document.createElement('a')
    link.href = fileItem.result.url
    link.download = fileItem.file.name.replace('.png', '.webp')
    link.click()
  }

  const downloadAll = async () => {
    const completedFiles = files.filter(f => f.status === 'done' && f.result)
    if (completedFiles.length === 0) return

    if (completedFiles.length === 1) {
      downloadFile(completedFiles[0])
      return
    }

    const zip = new JSZip()
    completedFiles.forEach(fileItem => {
      if (fileItem.result) {
        zip.file(
          fileItem.file.name.replace('.png', '.webp'),
          fileItem.result.blob
        )
      }
    })

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, 'converted-webp-images.zip')
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getSavings = (original: number, converted: number) => {
    const savings = ((original - converted) / original) * 100
    return savings.toFixed(1)
  }

  const completedCount = files.filter(f => f.status === 'done').length
  const totalSavings = files.reduce((acc, f) => {
    if (f.result) {
      return acc + (f.result.originalSize - f.result.convertedSize)
    }
    return acc
  }, 0)

  return (
    <section className={styles.converter} id="convert">
      <div className={styles.container}>
        {/* Quality Slider */}
        {files.length > 0 && (
          <div className={styles.qualityControl}>
            <label htmlFor="quality">
              Quality: <span>{quality}%</span>
              {quality < 70 && (
                <span className={styles.qualityWarning}> — Smaller file, may lose quality</span>
              )}
            </label>
            <input
              type="range"
              id="quality"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={isConverting}
              className={styles.slider}
            />
            <div className={styles.qualityLabels}>
              <span>Smaller file</span>
              <span>Better quality</span>
            </div>
          </div>
        )}

        {/* Drop Zone */}
        {files.length === 0 && (
          <div
            className={`${styles.dropZone} ${dragActive ? styles.dropZoneActive : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".png,image/png"
              multiple
              onChange={handleFileSelect}
              className={styles.fileInput}
            />
            <div className={styles.dropZoneContent}>
              <div className={styles.icon}>📁</div>
              <h3>Drop PNG files here</h3>
              <p>or click to browse</p>
              <span className={styles.hint}>Up to 50 files, max 10MB each</span>
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className={styles.fileList}>
            <div className={styles.fileListHeader}>
              <span>{files.length} file{files.length !== 1 ? 's' : ''} selected</span>
              {!isConverting && (
                <button onClick={clearFiles} className={styles.clearBtn}>
                  Clear all
                </button>
              )}
            </div>

            <div className={styles.files}>
              {files.map((fileItem) => (
                <div key={fileItem.id} className={styles.fileItem}>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileIcon}>
                      {fileItem.status === 'done' ? '✓' : 
                       fileItem.status === 'error' ? '✗' : 
                       fileItem.status === 'converting' ? '⏳' : '📄'}
                    </span>
                    <div className={styles.fileDetails}>
                      <span className={styles.fileName}>{fileItem.file.name}</span>
                      <span className={styles.fileSize}>{formatSize(fileItem.file.size)}</span>
                    </div>
                  </div>

                  <div className={styles.fileActions}>
                    {fileItem.status === 'done' && fileItem.result && (
                      <>
                        <span className={styles.savings}>
                          -{getSavings(fileItem.result.originalSize, fileItem.result.convertedSize)}%
                        </span>
                        <button
                          onClick={() => downloadFile(fileItem)}
                          className={styles.downloadBtn}
                        >
                          Download
                        </button>
                      </>
                    )}
                    {!isConverting && (
                      <button
                        onClick={() => removeFile(fileItem.id)}
                        className={styles.removeBtn}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress */}
            {isConverting && (
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <span className={styles.progressText}>{Math.round(overallProgress)}%</span>
              </div>
            )}

            {/* Stats */}
            {completedCount > 0 && (
              <div className={styles.stats}>
                <span>✓ {completedCount} converted</span>
                {totalSavings > 0 && (
                  <span>Total saved: {formatSize(totalSavings)}</span>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.actions}>
              {!isConverting && completedCount < files.length && (
                <button
                  onClick={convertAll}
                  className={styles.convertBtn}
                  disabled={files.length === 0}
                >
                  Convert {files.length} file{files.length !== 1 ? 's' : ''}
                </button>
              )}
              
              {completedCount > 0 && !isConverting && (
                <button
                  onClick={downloadAll}
                  className={styles.downloadAllBtn}
                >
                  Download {completedCount === 1 ? 'File' : 'All as ZIP'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}