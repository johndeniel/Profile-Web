'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Award, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { LicenseCertificate } from '@/types';

interface LicenseCertificateListProps {
  certificates: LicenseCertificate[];
}

interface SidebarItemProps {
  cert: LicenseCertificate;
  isActive: boolean;
  onSelect: (cert: LicenseCertificate) => void;
}

/** Formats an ISO date string as "Jan 2020". */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/** Single entry in the dialog sidebar with thumbnail, title, and date. */
function CertificateSidebarItem({
  cert,
  isActive,
  onSelect,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(cert)}
      className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted ${
        isActive ? 'bg-muted' : ''
      }`}
    >
      {cert.blobUrl ? (
        <span className="relative block h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-border/60">
          <Image
            src={cert.blobUrl}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </span>
      ) : (
        <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted">
          <Award
            aria-hidden="true"
            className="h-4 w-4 text-muted-foreground/50"
          />
        </span>
      )}

      <span className="block min-w-0 flex-1 pt-0.5">
        <span className="line-clamp-2 block text-xs font-medium leading-tight text-foreground">
          {cert.title}
        </span>
        <span className="mt-1 block text-[10px] text-muted-foreground">
          {formatDate(cert.issued)}
        </span>
      </span>
    </button>
  );
}

/**
 * Horizontally scrollable certificate gallery. MAIN certificates render as
 * cards; selecting one opens a dialog with its SUB certificates (grouped by
 * credential ID) and a fullscreen image preview.
 */
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

  // Top-level cards.
  const mainCerts = useMemo(
    () => certificates.filter((cert) => cert.level === 'MAIN'),
    [certificates]
  );

  // SUB certificates grouped by credential (falling back to the cert id).
  const subCertsByCredentialId = useMemo(() => {
    const map = new Map<string, LicenseCertificate[]>();

    for (const cert of certificates.filter((c) => c.level === 'SUB')) {
      const key = cert.credentialId ?? cert.id;
      map.set(key, [...(map.get(key) ?? []), cert]);
    }

    return map;
  }, [certificates]);

  const getSubCerts = useCallback(
    (mainCert: LicenseCertificate) =>
      subCertsByCredentialId.get(mainCert.credentialId ?? mainCert.id) ?? [],
    [subCertsByCredentialId]
  );

  // Open the dialog on a MAIN certificate.
  const handleOpen = useCallback((cert: LicenseCertificate) => {
    setSelectedCert(cert);
    setPreviewCert(cert);
    setDescriptionExpanded(false);
  }, []);

  // Switch the previewed certificate inside the dialog.
  const handlePreview = useCallback((cert: LicenseCertificate) => {
    setPreviewCert(cert);
    setDescriptionExpanded(false);
  }, []);

  // Close the dialog and clear its state.
  const handleClose = useCallback(() => {
    setSelectedCert(null);
    setPreviewCert(null);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Section header with certificate count */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Licenses & Certificates
        </h3>

        <Badge variant="secondary" className="text-xs">
          {certificates.length} certificates
        </Badge>
      </div>

      {mainCerts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No licenses or certificates added yet.
        </p>
      ) : (
        /* Certificate cards */
        <div className="flex flex-row flex-nowrap items-start gap-4 overflow-x-auto scrollbar-none pb-2">
          {mainCerts.map((cert) => {
            const subCerts = getSubCerts(cert);

            return (
              <div
                key={cert.id}
                className="group w-72 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5"
              >
                {/* Clickable preview opens the dialog */}
                {cert.blobUrl && (
                  <button
                    type="button"
                    onClick={() => handleOpen(cert)}
                    aria-label={`View ${cert.title} certificates`}
                    className="relative block aspect-16/10 w-full cursor-pointer overflow-hidden bg-linear-to-br from-muted/50 to-muted"
                  >
                    <Image
                      src={cert.blobUrl}
                      alt={cert.title}
                      fill
                      sizes="288px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                    <span className="absolute bottom-0 left-0 right-0 block p-4 text-left">
                      <span className="line-clamp-2 block text-sm font-semibold leading-snug text-white">
                        {cert.title}
                      </span>
                      <span className="mt-1 block text-xs text-white/80">
                        {cert.issuer}
                      </span>
                    </span>

                    {subCerts.length > 0 && (
                      <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        +{subCerts.length}
                      </span>
                    )}
                  </button>
                )}

                {/* Issue date + issuer verification link */}
                <div className="flex items-center justify-between p-4">
                  <span className="text-[11px] text-muted-foreground">
                    {formatDate(cert.issued)}
                  </span>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                    >
                      Verify
                      <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail dialog */}
      <Dialog
        open={selectedCert !== null}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogContent
          className="max-h-[90vh] gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card p-0 shadow-2xl sm:max-w-4xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">{selectedCert?.title}</DialogTitle>

          {selectedCert && (
            <div className="flex h-full max-h-[90vh] flex-col">
              {/* Top bar with verify + close actions */}
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
                      <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    </a>
                  )}

                  <button
                    type="button"
                    aria-label="Close dialog"
                    onClick={handleClose}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Sidebar + preview */}
              <div className="flex min-h-0 flex-1 overflow-hidden">
                {/* Sidebar listing the MAIN cert and its SUB certs */}
                <div className="hidden w-64 flex-col border-r border-border/60 bg-muted/20 sm:flex">
                  <div className="border-b border-border/60 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Certificates ({1 + getSubCerts(selectedCert).length})
                    </p>
                  </div>

                  <div className="flex-1 space-y-1 overflow-y-auto p-2">
                    <CertificateSidebarItem
                      cert={selectedCert}
                      isActive={previewCert?.id === selectedCert.id}
                      onSelect={handlePreview}
                    />
                    {getSubCerts(selectedCert).map((subCert) => (
                      <CertificateSidebarItem
                        key={subCert.id}
                        cert={subCert}
                        isActive={previewCert?.id === subCert.id}
                        onSelect={handlePreview}
                      />
                    ))}
                  </div>
                </div>

                {/* Previewed certificate */}
                {previewCert && (
                  <div className="flex min-h-0 flex-1 flex-col">
                    {/* Title + collapsible description */}
                    <div className="border-b border-border/60 bg-muted/10 px-6 py-4">
                      <h3 className="mb-1 text-base font-semibold text-foreground">
                        {previewCert.title}
                      </h3>

                      {previewCert.description && (
                        <>
                          <p
                            className={`text-justify text-sm leading-relaxed text-foreground/80 ${
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

                    {/* Certificate image (or fallback) */}
                    <div className="flex-1 overflow-auto bg-linear-to-br from-muted/30 to-muted/10 p-6">
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
                              <Award aria-hidden="true" className="h-10 w-10" />
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

              {/* Footer with credential ID + issuer */}
              {previewCert && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 bg-muted/20 px-6 py-3">
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
