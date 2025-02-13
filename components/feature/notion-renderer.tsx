'use client';

import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  type NotionComponents,
  NotionRenderer as OriginalRenderer,
} from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css'; // 代码高亮主题
import 'katex/dist/katex.min.css'; // 数学公式样式
import { ExtendedRecordMap } from 'notion-types';

// 按需加载复杂组件
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport');
      return m.Modal;
    }),
  {
    ssr: false,
  }
);

interface NotionRendererProps {
  data: ExtendedRecordMap;
  idToSlug?: Record<string, string>;
}

export default function NotionRenderer({
  data,
  idToSlug = {},
}: NotionRendererProps) {
  const components = React.useMemo<Partial<NotionComponents>>(
    () => ({
      nextLegacyImage: Image,
      nextLink: Link,
      Collection,
      Equation,
      Pdf,
      Modal,
      // Header: NotionPageHeader,
      // propertyLastEditedTimeValue,
      // propertyTextValue,
      // propertyDateValue,
    }),
    []
  );

  return (
    <OriginalRenderer
      recordMap={data}
      fullPage={true}
      components={components}
      mapPageUrl={(pageId) => `/blog/${idToSlug[pageId] || pageId}`}
    />
  );
}
