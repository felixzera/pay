import React from 'react';
import { useTranslation } from 'react-i18next';
import { Props } from './types';
import { Collapsible } from '../../../elements/Collapsible';
import RenderFields from '../../RenderFields';
import SectionTitle from './SectionTitle';
import Pill from '../../../elements/Pill';
import HiddenInput from '../HiddenInput';
import { getTranslation } from '../../../../../utilities/getTranslation';
import { createNestedFieldPath } from '../../Form/createNestedFieldPath';
import { RowActions } from './RowActions';
import type { UseDraggableSortableReturn } from '../../../elements/DraggableSortable/useDraggableSortable/types';
import type { Row } from '../../Form/types';
import type { Block } from '../../../../../fields/config/types';
import { useFormSubmitted } from '../../Form/context';

const baseClass = 'blocks-field';

type BlockFieldProps = UseDraggableSortableReturn & Pick<Props, 'path' | 'labels' | 'blocks' | 'fieldTypes' | 'indexPath' | 'permissions'> & {
  addRow: (rowIndex: number, blockType: string) => void
  duplicateRow: (rowIndex: number) => void
  removeRow: (rowIndex: number) => void
  moveRow: (fromIndex: number, toIndex: number) => void
  setCollapse: (id: string, collapsed: boolean) => void
  rowIndex: number
  row: Row
  readOnly: boolean
  rowCount: number
  blockToRender: Block
}
export const BlockRow: React.FC<BlockFieldProps> = ({
  path: parentPath,
  addRow,
  removeRow,
  moveRow,
  duplicateRow,
  setCollapse,
  transform,
  listeners,
  attributes,
  setNodeRef,
  row,
  rowIndex,
  rowCount,
  indexPath,
  readOnly,
  labels,
  fieldTypes,
  permissions,
  blocks,
  blockToRender,
}) => {
  const path = `${parentPath}.${rowIndex}`;
  const { t, i18n } = useTranslation();
  const hasSubmitted = useFormSubmitted();

  const childErrorPathsCount = row.childErrorPaths?.size;
  const fieldHasErrors = hasSubmitted && childErrorPathsCount > 0;

  const classNames = [
    `${baseClass}__row`,
    fieldHasErrors ? `${baseClass}__row--has-errors` : `${baseClass}__row--no-errors`,
  ].filter(Boolean).join(' ');

  return (
    <div
      key={`${path}-row-${rowIndex}`}
      id={`${path}-row-${rowIndex}`}
      ref={setNodeRef}
      style={{
        transform,
      }}
    >
      <Collapsible
        collapsed={row.collapsed}
        onToggle={(collapsed) => setCollapse(row.id, collapsed)}
        className={classNames}
        collapsibleStyle={fieldHasErrors ? 'error' : 'default'}
        key={row.id}
        dragHandleProps={{
          id: row.id,
          attributes,
          listeners,
        }}
        header={(
          <div className={`${baseClass}__block-header`}>
            <span className={`${baseClass}__block-number`}>
              {String(rowIndex + 1).padStart(2, '0')}
            </span>
            <Pill
              pillStyle="white"
              className={`${baseClass}__block-pill ${baseClass}__block-pill-${row.blockType}`}
            >
              {getTranslation(blockToRender.labels.singular, i18n)}
            </Pill>
            <SectionTitle
              path={`${path}.blockName`}
              readOnly={readOnly}
            />
            {fieldHasErrors && (
              <Pill
                pillStyle="error"
                rounded
                className={`${baseClass}__error-pill`}
              >
                {`${childErrorPathsCount} ${childErrorPathsCount > 1 ? t('error:plural') : t('error:singular')}`}
              </Pill>
            )}
          </div>
        )}
        actions={!readOnly ? (
          <RowActions
            addRow={addRow}
            removeRow={removeRow}
            moveRow={moveRow}
            duplicateRow={duplicateRow}
            rowCount={rowCount}
            rowIndex={rowIndex}
            blockType={row.blockType}
            blocks={blocks}
            labels={labels}
          />
        ) : undefined}
      >
        <HiddenInput
          name={`${path}.id`}
          value={row.id}
        />
        <RenderFields
          className={`${baseClass}__fields`}
          readOnly={readOnly}
          fieldTypes={fieldTypes}
          permissions={permissions?.fields}
          fieldSchema={blockToRender.fields.map((field) => ({
            ...field,
            path: createNestedFieldPath(path, field),
          }))}
          indexPath={indexPath}
        />
      </Collapsible>
    </div>
  );
};
