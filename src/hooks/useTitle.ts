import { useEffect, useState } from 'react';

const useTitle = (initialTitle: string) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) htmlTitle.innerHTML = title;
  }, [title]);

  return [title, setTitle];
};

export default useTitle;
