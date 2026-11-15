// AGPL-3.0 §13: quien usa el servicio por red debe poder obtener el código
// fuente de la versión que corre. Se muestra en la app y en el login.
export const SOURCE_CODE_URL = 'https://github.com/rjvelazquez/pixeo-publish/tree/pixeo';
export const UPSTREAM_URL = 'https://github.com/gitroomhq/postiz-app';

export const SourceNotice = () => {
  return (
    <div className="flex flex-col items-center gap-[2px] text-[10px] leading-[12px] text-center text-textItemBlur">
      <a
        href={SOURCE_CODE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-newTextColor"
      >
        Código fuente
      </a>
      <span>
        Basado en{' '}
        <a
          href={UPSTREAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-newTextColor"
        >
          Postiz
        </a>{' '}
        (AGPL-3.0)
      </span>
    </div>
  );
};
