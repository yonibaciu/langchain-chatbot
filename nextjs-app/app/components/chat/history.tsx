'use client';

type HistoryProps = {
  items: {
    type: string;
    message: string;
  }[];
}

export default function History(props: HistoryProps) {
  return (
    <div className="flex w-1/3 flex-col mb-6">
      {props.items.map((item) => (
        <div className={ `flex w-full flex-row mb-6 ${item.type == 'user' ? 'justify-start' : 'justify-end'}` }>
          <div className={ `w-2/3 p-3 rounded-lg ${item.type == 'user' ? 'bg-orange-200' : 'bg-blue-200'}` }>
            {item.type}: {item.message}
          </div>
        </div>
      ))}
    </div>
  );
}
