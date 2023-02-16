import { useEffect, useRef, useState } from 'react'

import { jsPDF } from 'jspdf'
import {
  BlobReader,
  BlobWriter,
  ZipWriter,
} from '@zip.js/zip.js'

import { Content } from './components/Content'
import { Grid } from './components/Grid'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { drawElement } from './pdf'
import { DocumentEditor } from './components/DocumentEditor'
import { replaceTemplates } from './replaceTemplates'
import { BottomToolbar } from './components/BottomToolbar'
import { Document } from './Document'

const localStorageKey = 'pdfTemplateGeneratorState'

let stored: { document?: Document, zoom?: number, fileName?: string, data?: Array<Array<string>> } | undefined
try {
  stored = JSON.parse(localStorage.getItem(localStorageKey) ?? '')
} catch (error) {
  // Suppress error
}


function App() {
  const [zoom, setZoom] = useState(stored?.zoom ?? 0.8)
  const [document, setDocument] = useState<Document | undefined>(stored?.document)
  const [fileName, setFileName] = useState<string | undefined>(stored?.fileName)
  const [data, setData] = useState<Array<Array<string>>>(stored?.data ?? [])
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fileName) return
    const currentTitle = window.document.title
    window.document.title = `${fileName} – ${currentTitle}`

    return () => {
      window.document.title = currentTitle
    }
  }, [fileName])
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify({ document, zoom, fileName, data }))
  }, [data, document, fileName, zoom])
  return (
    <Grid>
      <Header />
      <Sidebar
        document={document}
        data={data ?? []}
        onDataChange={setData}
        onOpenPdf={async () => {
          const target = pageRef.current
          if (!document || !target || data.length === 0) return

          const entry = data[0]

          const pdfBlob = await createPdf(target, document.templates ?? [], entry)
          downloadBlob(`${entry.join('; ')}.pdf`, pdfBlob)
        }}
        onDownloadZip={async () => {
          const target = pageRef.current
          if (!document || !target || data.length === 0) return

          const zipFileWriter = new BlobWriter()
          const zipFile = new ZipWriter(zipFileWriter)

          await Promise.all(data.map(async (entry) => {
            const pdfBlob = await createPdf(target, document.templates ?? [], entry)
            await zipFile.add(`${entry.join('; ')}.pdf`, new BlobReader(pdfBlob))
          }))

          await zipFile.close()
          const blob = await zipFileWriter.getData()
          downloadBlob('documents.zip', blob)
        }}
        onOpenFile={async () => {
          const file = await selectFile()

          if (!file) return

          const content = await readFile(file)

          setFileName(file.name)
          setDocument(JSON.parse(content))
        }}
        onSaveFile={() => {
          if (!document) return

          const blob = new Blob([JSON.stringify(document)])
          downloadBlob(fileName ?? 'template.json', blob)
        }}
        onClearData={() => {
          setDocument(undefined)
          setData([])
          setFileName(undefined)
        }}
      />
        <Content zoom={zoom}>
          {document && (
            <DocumentEditor ref={pageRef} value={document} onChange={setDocument as React.Dispatch<React.SetStateAction<Document>>} />
          )}
        </Content>
        <BottomToolbar
          zoom={zoom}
          onSetZoom={setZoom}
        />
    </Grid>
  )
}

const downloadBlob = (fileName: string, blob: Blob) => {
  const anchor = document.createElement("a")
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = fileName;
  anchor.click();
  window.URL.revokeObjectURL(anchor.href);
}

const createPdf = async (target: HTMLElement, templateFields: Array<string>, templateData: Array<string>) => {
  const pdf = new jsPDF({
    unit: 'pt',
  })
  await drawElement(pdf, target, async (element) => {
    replaceTemplates(element, templateFields, templateData)
  })
  return pdf.output('blob')
}

const selectFile = async () => new Promise<File | undefined>((resolve) => {
  const input = window.document.createElement('input')
  input.type = 'file'
  input.addEventListener('change', () => {
    resolve(input.files?.[0])
  })
  input.click()
})

const readFile = async (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.addEventListener('load', ({ target }) => {
    if (typeof target?.result === 'string') {
      resolve(target.result)
    } else {
      reject(new Error('Invalid file result'))
    }
  })
  reader.addEventListener('error', (error) => {
    reject(new Error('Failed to load file'))
  })
  reader.readAsText(file)
})

export default App;
