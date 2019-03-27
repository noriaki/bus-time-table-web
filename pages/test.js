import React from 'react';
import Link from 'next/link';

const TestPage = () => (
  <div>
    <p>This is Test page.</p>
    <p>
      <Link href="/">
        <a>link to '/'</a>
      </Link>
    </p>
  </div>
);

export default TestPage;
