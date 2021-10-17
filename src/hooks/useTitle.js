import { useEffect, useState } from 'react';

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = title;
  }, [title]);

  return [title, setTitle];
};

export default useTitle;
