import { FC } from 'react';

export const LoginBackground: FC = () => {
  return (
    <>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green/20 to-yellow/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue/20 to-green/20 rounded-full blur-3xl"></div>
      </div>
    </>
  );
};
