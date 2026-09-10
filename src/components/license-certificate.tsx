'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { LicenseCertificate } from '@/types';

interface LicenseCertificateListProps {
  certificates: LicenseCertificate[];
}

function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}

export function LicenseCertificateList({
  certificates,
}: LicenseCertificateListProps) {
  const [selectedCert, setSelectedCert] = useState<LicenseCertificate | null>(
    null
  );
  const [previewCert, setPreviewCert] = useState<LicenseCertificate | null>(
    null
  );

  const mainCerts = useMemo(
    () => certificates.filter((cert) => cert.level === 'MAIN'),
    [certificates]
  );

  const subCertsByCredentialId = useMemo(() => {
    const map = new Map<string, LicenseCertificate[]>();
    certificates
      .filter((cert) => cert.level === 'SUB')
      .forEach((cert) => {
        const key = cert.credentialId ?? cert.id;
        const existing = map.get(key) ?? [];
        existing.push(cert);
        map.set(key, existing);
      });
    return map;
  }, [certificates]);

  const getSubCerts = (mainCert: LicenseCertificate) => {
    return (
      subCertsByCredentialId.get(mainCert.credentialId ?? mainCert.id) ?? []
    );
  };

  const handleOpenDialog = (cert: LicenseCertificate) => {
    setSelectedCert(cert);
    setPreviewCert(cert);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Licenses & Certificates
        </h3>
      </div>

      {/* Certificate List */}
      <div className="flex flex-row flex-nowrap items-start gap-3 overflow-x-auto scrollbar-none">
        {mainCerts.map((cert) => {
          const subCerts = getSubCerts(cert);
          return (
            <div
              key={cert.id}
              className="shrink-0 w-64 cursor-pointer rounded-lg border border-border bg-card p-4 transition-all hover:border-muted-foreground/20 hover:shadow-md"
              onClick={() => handleOpenDialog(cert)}
            >
              {cert.blobUrl && (
                <div className="mb-3 overflow-hidden rounded-md">
                  <Image
                    src={cert.blobUrl}
                    alt={cert.title}
                    width={300}
                    height={200}
                    sizes="224px"
                    loading="eager"
                    className="h-36 w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold leading-tight text-foreground">
                    {cert.title}
                  </h4>
                  {subCerts.length > 0 && (
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      +{subCerts.length}
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">{cert.issuer}</p>

                {cert.credentialId && (
                  <p className="text-[10px] text-muted-foreground">
                    ID: {cert.credentialId}
                  </p>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Verify
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                <p className="text-[10px] text-muted-foreground">
                  {formatYear(cert.issued)}
                </p>

                {subCerts.length > 0 && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    View {subCerts.length} related
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PDF Viewer Style Dialog */}
      <Dialog
        open={selectedCert !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCert(null);
            setPreviewCert(null);
          }
        }}
      >
        <DialogContent
          className="gap-0 p-0 sm:max-w-5xl sm:h-[85vh] overflow-hidden rounded-lg border border-border shadow-xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Certificate Viewer</DialogTitle>
          {selectedCert && (
            <div className="flex h-full">
              {/* Left Panel - Certificate List */}
              <div className="flex w-72 flex-col border-r border-border bg-muted/20">
                <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Documents
                  </span>
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    {getSubCerts(selectedCert).length + 1}
                  </Badge>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {/* Main Cert */}
                  <button
                    type="button"
                    className={`flex w-full items-start gap-3 border-b border-border p-3 text-left transition-colors hover:bg-muted ${
                      previewCert?.id === selectedCert.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setPreviewCert(selectedCert)}
                  >
                    {selectedCert.blobUrl ? (
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded border border-border">
                        <Image
                          src={selectedCert.blobUrl}
                          alt={selectedCert.title}
                          width={64}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded border border-border bg-muted">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-xs font-medium leading-tight text-foreground">
                        {selectedCert.title}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {selectedCert.issuer}
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {formatYear(selectedCert.issued)}
                      </p>
                    </div>
                  </button>

                  {/* Sub Certs */}
                  {getSubCerts(selectedCert).map((subCert) => (
                    <button
                      key={subCert.id}
                      type="button"
                      className={`flex w-full items-start gap-3 border-b border-border p-3 text-left transition-colors hover:bg-muted ${
                        previewCert?.id === subCert.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setPreviewCert(subCert)}
                    >
                      {subCert.blobUrl ? (
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded border border-border">
                          <Image
                            src={subCert.blobUrl}
                            alt={subCert.title}
                            width={64}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded border border-border bg-muted">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className="text-xs font-medium leading-tight text-foreground">
                          {subCert.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {subCert.issuer}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {formatYear(subCert.issued)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Panel - Preview */}
              <div className="flex flex-1 flex-col bg-background">
                {previewCert && (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                      <p className="truncate text-sm font-medium text-foreground">
                        {previewCert.title}
                      </p>
                      {previewCert.credentialUrl && (
                        <a
                          href={previewCert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 inline-flex shrink-0 items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-foreground transition-colors hover:bg-muted"
                        >
                          Verify
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    {previewCert.description && (
                      <div className="border-b border-border px-4 py-2.5">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {previewCert.description}
                        </p>
                      </div>
                    )}

                    {/* Image Preview */}
                    <div className="flex-1 overflow-auto bg-muted/10 p-6">
                      {previewCert.blobUrl ? (
                        <div className="mx-auto flex h-full max-w-3xl items-center justify-center">
                          <Image
                            src={previewCert.blobUrl}
                            alt={previewCert.title}
                            width={800}
                            height={618}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="h-auto w-full rounded-lg border border-border bg-white object-contain shadow-md"
                          />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="flex flex-col items-center gap-3 text-muted-foreground">
                            <div className="rounded-full bg-muted p-4">
                              <FileText className="h-8 w-8" />
                            </div>
                            <p className="text-sm font-medium">
                              No preview available
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
