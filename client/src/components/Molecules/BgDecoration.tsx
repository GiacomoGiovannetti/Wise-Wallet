import { useLocation } from 'react-router-dom';

export const BgDecorations = () => {
  const location = useLocation();
  return (
    <div
      className={`w-full ${
        location.pathname === '/components' ? 'hidden' : ''
      }`}
    >
      <div
        className={`absolute size-64 bg-gunMetal-100 rounded-full blur-2xl -top-8 z-0 md:size-96  lg:-top-36 lg:size-[36rem]
                    ${
                      location.pathname === '/'
                        ? '-right-16'
                        : location.pathname === '/registration' ||
                          location.pathname === '/login'
                        ? '-left-16'
                        : location.pathname === '/forgot-password' ||
                          location.pathname === '/change-password'
                        ? 'left-[20%] md:left-[28%] lg:left-[25%] xl:left-[32%] 2xl:left-[36%]'
                        : location.pathname === '/transactions'
                        ? 'left-[20%] md:left-[28%] lg:left-[25%] xl:left-[32%] 2xl:left-[36%]'
                        : location.pathname === '/expenses-overview'
                        ? '-right-16 md:-right-24 lg:-right-48 xl:-right-56 2xl:-right-64'
                        : '-right-16 '
                    } `}
      ></div>
      <div
        className={`absolute size-64 bg-gunMetal-100 rounded-full blur-2xl  -bottom-20 z-0 md:size-96 md:-bottom-48 lg:-bottom-64 lg:size-[36rem] ${
          location.pathname === '/'
            ? '-left-16'
            : location.pathname === '/registration' ||
              location.pathname === '/login'
            ? '-right-16'
            : location.pathname === '/forgot-password' ||
              location.pathname === '/change-password'
            ? 'left-[20%] md:left-[28%] lg:left-[25%] xl:left-[32%] 2xl:left-[36%]'
            : location.pathname === '/transactions'
            ? '-left-16 md:-left-24 lg:-left-48 xl:-left-56 2xl:-left-64'
            : location.pathname === '/expenses-overview'
            ? 'left-[20%] md:left-[28%] lg:left-[25%] xl:left-[32%] 2xl:left-[36%]'
            : '-left-16'
        } `}
      ></div>
    </div>
  );
};
