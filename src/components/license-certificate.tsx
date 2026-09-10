'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
              onClick={() => setSelectedCert(cert)}
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

      {/* Certificate Detail Dialog */}
      <Dialog
        open={selectedCert !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedCert && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCert.title}</DialogTitle>
                <DialogDescription>{selectedCert.issuer}</DialogDescription>
              </DialogHeader>

              {/* Main Certificate */}
              <div className="flex flex-col gap-4">
                {selectedCert.blobUrl && (
                  <div className="overflow-hidden rounded-md">
                    <Image
                      src={selectedCert.blobUrl}
                      alt={selectedCert.title}
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="w-full object-contain"
                    />
                  </div>
                )}

                {selectedCert.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedCert.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {selectedCert.credentialId && (
                    <span className="text-muted-foreground">
                      ID: {selectedCert.credentialId}
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    Issued: {formatYear(selectedCert.issued)}
                  </span>
                </div>

                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    Verify Credential
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Related Sub Certificates */}
              {getSubCerts(selectedCert).length > 0 && (
                <div className="border-t border-border pt-4">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">
                    Related Credentials
                  </h4>
                  <div className="flex flex-col gap-4">
                    {getSubCerts(selectedCert).map((subCert) => (
                      <div
                        key={subCert.id}
                        className="rounded-md border border-border p-4"
                      >
                        {subCert.blobUrl && (
                          <div className="mb-3 overflow-hidden rounded-md">
                            <Image
                              src={subCert.blobUrl}
                              alt={subCert.title}
                              width={400}
                              height={250}
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="w-full object-contain"
                            />
                          </div>
                        )}

                        <h5 className="text-sm font-medium text-foreground">
                          {subCert.title}
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          {subCert.issuer}
                        </p>

                        {subCert.description && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            {subCert.description}
                          </p>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                          {subCert.credentialId && (
                            <span className="text-muted-foreground">
                              ID: {subCert.credentialId}
                            </span>
                          )}
                          <span className="text-muted-foreground">
                            {formatYear(subCert.issued)}
                          </span>
                        </div>

                        {subCert.credentialUrl && (
                          <a
                            href={subCert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 hover:underline"
                          >
                            Verify
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
