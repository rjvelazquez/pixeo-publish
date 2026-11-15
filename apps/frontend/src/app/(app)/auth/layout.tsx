import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { AttributionComponent } from '@gitroom/frontend/components/auth/attribution.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
import { SourceNotice } from '@gitroom/frontend/components/new-layout/source.notice';
import { ParallaxShowcase } from '@gitroom/frontend/components/auth/parallax.showcase';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <MantineWrapper>
      <Toaster />
      <div className="bg-[#0E0E0E] flex flex-1 p-[12px] gap-[12px] min-h-screen w-full text-white">
        {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
        <ReturnUrlComponent />
        <AttributionComponent />
        <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[12px] text-white p-[12px] bg-[#1A1919]">
          <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col text-white">
            <LogoTextComponent />
            <div className="flex">{children}</div>
            <SourceNotice />
          </div>
        </div>
        <div className="text-[36px] flex-1 pt-[88px] [@media(max-height:820px)]:pt-[40px] pb-[12px] hidden lg:flex flex-col items-center">
          <div className="text-center">
            Programa y publica en todas tus redes
            <br />
            desde <span className="text-[42px] text-[#FC69FF]">un solo lugar</span>
          </div>
          <ParallaxShowcase />
        </div>
      </div>
    </MantineWrapper>
  );
}
