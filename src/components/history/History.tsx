import React from 'react';
import { Ps1 } from '../Ps1';
import { History as HistoryInterface } from './interface';

export const History: React.FC<{ history: Array<HistoryInterface> }> = ({
  history,
}) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => (
        <div key={entry.command + index}>
          <div className="flex flex-row space-x-2">
            <div className="flex-shrink">
              <Ps1 />
            </div>

            <div className="flex-grow">{entry.command}</div>
          </div>

          <div className="whitespace-pre-wrap mb-2 leading-[normal]">
            {entry.output}
          </div>
        </div>
      ))}
    </>
  );
};

export default History;
