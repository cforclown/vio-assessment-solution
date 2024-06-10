import { twMerge } from 'tailwind-merge';

export interface IPage404 {
  fullscreen?: boolean;
  msg?: string;
  code?: number;
}

function Page404({ fullscreen, msg, code }: IPage404): JSX.Element {
  return (
    <div 
      className={twMerge(
        fullscreen ? 'w-screen h-screen' : 'w-full h-full',
        'overflow-hidden flex justify-center items-center'
      )}
    >
      <h1 className="text-lg font-bold">
        {code ? `${code} ` : null}
        <span className="text-red-500">|</span>
        {msg ? ` ${msg}` : null}
      </h1>
    </div>
  );
}

export default Page404;
