import React from 'react';
import LeftPanel from '../components/LeftPanel';
import Logger from '../logger/Logger'

const Main = () => {
  const logger = Logger.getInstance();
  logger.log('started application');
  return (
    <div style={{overflowX: 'hidden'}}>
      <LeftPanel/>
    </div>
  );
}

export default Main;