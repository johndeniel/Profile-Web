'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, Award, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { LicenseCertificate } from '@/types';

interface LicenseCertificateListProps {
  certificates: LicenseCertificate[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function formatFullDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
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

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

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

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Licenses & Certificates
        </h3>

        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {certificates.length} credentials
        </span>
      </div>

      {/* Certificate List */}
      <div className="flex flex-row flex-nowrap items-start gap-4 overflow-x-auto scrollbar-none pb-2">
        {mainCerts.map((cert) => {
          const subCerts = getSubCerts(cert);

          return (
            <div
              key={cert.id}
              className="group w-72 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5"
              onClick={() => {
                setSelectedCert(cert);
                setPreviewCert(cert);
                setDescriptionExpanded(false);
              }}
            >
              {cert.blobUrl && (
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                  <Image
                    src={cert.blobUrl}
                    alt={cert.title}
                    fill
                    sizes="288px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                      {cert.title}
                    </h4>

                    <p className="mt-1 text-xs text-white/80">{cert.issuer}</p>
                  </div>

                  {subCerts.length > 0 && (
                    <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      +{subCerts.length}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <span className="text-[11px] text-muted-foreground">
                    {formatDate(cert.issued)}
                  </span>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Verify
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dialog */}
      <Dialog
        open={selectedCert !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCert(null);
          }
        }}
      >
        <DialogContent
          className="max-h-[90vh] gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card p-0 shadow-2xl sm:max-w-4xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{selectedCert?.title}</DialogTitle>

          {selectedCert && (
            <div className="flex h-full max-h-[90vh] flex-col">
              {/* Top Bar */}
              <div className="flex items-center justify-end border-b border-border/60 px-6 py-4">
                <div className="flex items-center gap-2">
                  {previewCert?.credentialUrl && (
                    <a
                      href={previewCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Verify
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCert(null);
                      setPreviewCert(null);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex min-h-0 flex-1 overflow-hidden">
                {/* Sidebar - All Certs */}
                <div className="hidden w-64 flex-col border-r border-border/60 bg-muted/20 sm:flex">
                  <div className="border-b border-border/60 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Certificates ({1 + getSubCerts(selectedCert).length})
                    </p>
                  </div>

                  <div className="flex-1 space-y-1 overflow-y-auto p-2">
                    {/* Main Cert */}
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewCert(selectedCert);
                        setDescriptionExpanded(false);
                      }}
                      className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted ${
                        previewCert?.id === selectedCert.id ? 'bg-muted' : ''
                      }`}
                    >
                      {selectedCert.blobUrl ? (
                        <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-border/60">
                          <Image
                            src={selectedCert.blobUrl}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted">
                          <Award className="h-4 w-4 text-muted-foreground/50" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="line-clamp-2 text-xs font-medium leading-tight text-foreground">
                          {selectedCert.title}
                        </p>

                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {formatDate(selectedCert.issued)}
                        </p>
                      </div>
                    </button>

                    {/* Sub Certs */}
                    {getSubCerts(selectedCert).map((subCert) => (
                      <button
                        key={subCert.id}
                        type="button"
                        onClick={() => {
                          setPreviewCert(subCert);
                          setDescriptionExpanded(false);
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted ${
                          previewCert?.id === subCert.id ? 'bg-muted' : ''
                        }`}
                      >
                        {subCert.blobUrl ? (
                          <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-border/60">
                            <Image
                              src={subCert.blobUrl}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted">
                            <Award className="h-4 w-4 text-muted-foreground/50" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="line-clamp-2 text-xs font-medium leading-tight text-foreground">
                            {subCert.title}
                          </p>

                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {formatDate(subCert.issued)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Preview */}
                {previewCert && (
                  <div className="flex min-h-0 flex-1 flex-col">
                    {/* Title and Description */}
                    <div className="border-b border-border/60 bg-muted/10 px-6 py-4">
                      <h3 className="mb-1 text-base font-semibold text-foreground">
                        {previewCert.title}
                      </h3>

                      {previewCert.description && (
                        <>
                          <p
                            className={`text-sm leading-relaxed text-foreground/80 ${
                              !descriptionExpanded ? 'line-clamp-2' : ''
                            }`}
                          >
                            {previewCert.description}
                          </p>

                          {previewCert.description.length > 150 && (
                            <button
                              type="button"
                              onClick={() =>
                                setDescriptionExpanded(!descriptionExpanded)
                              }
                              className="mt-1 text-xs font-medium text-primary hover:underline"
                            >
                              {descriptionExpanded ? 'Show less' : 'See more'}
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* Certificate Image */}
                    <div className="flex-1 overflow-auto bg-gradient-to-br from-muted/30 to-muted/10 p-6">
                      {previewCert.blobUrl ? (
                        <div className="mx-auto flex h-full max-w-2xl items-center justify-center">
                          <Image
                            src={previewCert.blobUrl}
                            alt={previewCert.title}
                            width={1200}
                            height={850}
                            className="h-auto w-full rounded-xl border border-border/40 bg-white object-contain shadow-xl shadow-black/10"
                          />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="flex flex-col items-center gap-4 text-muted-foreground">
                            <div className="rounded-2xl bg-muted p-6">
                              <Award className="h-10 w-10" />
                            </div>

                            <div className="text-center">
                              <p className="text-sm font-medium">
                                No preview available
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground/70">
                                Click verify to view on issuer&apos;s website
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {previewCert && (
                <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-6 py-3">
                  <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                    {previewCert.credentialId && (
                      <span>
                        Credential ID:{' '}
                        <span className="font-mono">
                          {previewCert.credentialId}
                        </span>
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-muted-foreground/60">
                    {previewCert.issuer}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
