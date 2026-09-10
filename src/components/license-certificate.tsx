'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink, Award, ChevronRight, X } from 'lucide-react';
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
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/20">
          <Award className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
            Licenses & Certificates
          </h3>
          <p className="text-xs text-muted-foreground">
            {mainCerts.length} specialization{mainCerts.length !== 1 ? 's' : ''}{' '}
            &middot; {certificates.length} total credential
            {certificates.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mainCerts.map((cert) => {
          const subCerts = getSubCerts(cert);
          return (
            <button
              key={cert.id}
              type="button"
              onClick={() => setSelectedCert(cert)}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5"
            >
              {/* Image */}
              {cert.blobUrl && (
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                  <Image
                    src={cert.blobUrl}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Sub certs count badge */}
                  {subCerts.length > 0 && (
                    <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                      +{subCerts.length} credentials
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col gap-2.5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary/60" />
                  <p className="text-xs font-medium text-muted-foreground">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-muted-foreground/80">
                  <span>{formatDate(cert.issued)}</span>
                  {cert.credentialId && (
                    <>
                      <span className="text-border">·</span>
                      <span className="font-mono text-[10px]">
                        {cert.credentialId}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dialog */}
      <Dialog
        open={selectedCert !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
        }}
      >
        <DialogContent
          className="gap-0 p-0 sm:max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{selectedCert?.title}</DialogTitle>
          {selectedCert && (
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
                <div className="flex items-center gap-4">
                  {selectedCert.blobUrl && (
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-border/60">
                      <Image
                        src={selectedCert.blobUrl}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      {selectedCert.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {selectedCert.issuer} &middot;{' '}
                      {formatFullDate(selectedCert.issued)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedCert.credentialUrl && (
                    <a
                      href={selectedCert.credentialUrl}
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
                    onClick={() => setSelectedCert(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex flex-1 min-h-0 overflow-hidden">
                {/* Sidebar - Sub Certs */}
                {getSubCerts(selectedCert).length > 0 && (
                  <div className="hidden sm:flex w-64 flex-col border-r border-border/60 bg-muted/20">
                    <div className="px-4 py-3 border-b border-border/60">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Related Credentials ({getSubCerts(selectedCert).length})
                      </p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                      {getSubCerts(selectedCert).map((subCert) => (
                        <button
                          key={subCert.id}
                          type="button"
                          onClick={() => setSelectedCert(subCert)}
                          className="group/sub flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted"
                        >
                          {subCert.blobUrl ? (
                            <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-border/60">
                              <Image
                                src={subCert.blobUrl}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted">
                              <Award className="h-4 w-4 text-muted-foreground/50" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0 pt-0.5">
                            <p className="text-xs font-medium leading-tight text-foreground line-clamp-2 group-hover/sub:text-primary transition-colors">
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
                )}

                {/* Main Preview */}
                <div className="flex flex-1 flex-col min-h-0">
                  {/* Description */}
                  {selectedCert.description && (
                    <div className="border-b border-border/60 px-6 py-4 bg-muted/10">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        About this credential
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {selectedCert.description}
                      </p>
                    </div>
                  )}

                  {/* Certificate Image */}
                  <div className="flex-1 overflow-auto bg-gradient-to-br from-muted/30 to-muted/10 p-6">
                    {selectedCert.blobUrl ? (
                      <div className="mx-auto flex h-full max-w-2xl items-center justify-center">
                        <Image
                          src={selectedCert.blobUrl}
                          alt={selectedCert.title}
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
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-6 py-3">
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  {selectedCert.credentialId && (
                    <span>
                      Credential ID:{' '}
                      <span className="font-mono">
                        {selectedCert.credentialId}
                      </span>
                    </span>
                  )}
                  <span>Issued {formatFullDate(selectedCert.issued)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60">
                  {selectedCert.issuer}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
