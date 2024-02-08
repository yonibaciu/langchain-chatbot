'use client';

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

type HistoryProps = {
  items: {
    type: string;
    message: string;
  }[];
}

export default function History(props: HistoryProps) {
  function renderMessage(message: string) {
    if (message == 'loading...') {
      return <Image src={'/loading.gif'} alt='loading...' className="size-5" width="30" height="30" style={{display: 'inline'}} />
    }
    return message;
  }

  return (
    <div className="flex-col mb-6">
      {props.items.map((item, i) => (
        <div key={i} className={ `flex w-full flex-row mb-6 ${item.type == 'user' ? 'justify-start' : 'justify-end'}` }>
          <div className={ `w-2/3 p-3 rounded-lg ${item.type == 'user' ? 'bg-orange-200' : 'bg-blue-200'}` }>
            <FontAwesomeIcon icon={ item.type == 'user' ? faUser : faRobot } className="size-5 mr-2" />
            {renderMessage(item.message)}
          </div>
        </div>
      ))}
    </div>
  );
}
