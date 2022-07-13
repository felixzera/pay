import React, { useState, useEffect } from 'react';
import { useConfig } from '../../../../../../utilities/Config';
import useIntersect from '../../../../../../../hooks/useIntersect';
import { useListRelationships } from '../../../RelationshipProvider';

type Value = { relationTo: string, value: number | string };

const RelationshipCell = (props) => {
  const { field, data: cellData } = props;
  const { collections, routes } = useConfig();
  const [intersectionRef, entry] = useIntersect();
  const [values, setValues] = useState<Value[]>([]);
  const { getRelationships, documents } = useListRelationships();
  const [hasRequested, setHasRequested] = useState(false);

  const isAboveViewport = entry?.boundingClientRect?.top > 0;

  useEffect(() => {
    if (isAboveViewport && !hasRequested) {
      const formattedValues: Value[] = [];

      const arrayCellData = Array.isArray(cellData) ? cellData : [cellData];
      arrayCellData.slice(0, (arrayCellData.length < 3 ? arrayCellData.length : 3)).forEach((cell) => {
        if (typeof cell === 'object' && 'relationTo' in cell && 'value' in cell) {
          formattedValues.push(cell);
        }
        if ((typeof cell === 'number' || typeof cell === 'string') && field.relationTo === 'string') {
          formattedValues.push({
            value: cell,
            relationTo: field.relationTo,
          });
        }
      });
      getRelationships(formattedValues);
      setHasRequested(true);
      setValues(formattedValues);
    }
  }, [cellData, field, collections, isAboveViewport, routes.api, hasRequested, getRelationships]);

  return (
    <div ref={intersectionRef}>
      { values.map(({ relationTo, value }, i) => {
        const document = documents[relationTo][value];
        const relatedCollection = collections.find(({ slug }) => slug === relationTo);
        if (document && relatedCollection) {
          return (
            <React.Fragment key={i}>
              { document[relatedCollection.admin.useAsTitle] ?? `Untitled: ${value}`}
            </React.Fragment>
          );
        }
        return '';
      })}
      {/* { (Array.isArray(cellData) && cellData.length > values.length) && ( */}
      {/*  <React.Fragment>...</React.Fragment> */}
      {/* )} */}
    </div>
  );
};

export default RelationshipCell;
