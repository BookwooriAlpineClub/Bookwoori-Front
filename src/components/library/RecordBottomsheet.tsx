import type Book from '@src/types/book';
import type Record from '@src/types/record';
import { useState } from 'react';
import useModal from '@src/hooks/useModal';
import {
  usePostRecord,
  usePatchRecord,
  useDeleteRecord,
} from '@src/hooks/query/record';
import { bottomsheetState, dialogState } from '@src/states/atoms';
import styled from 'styled-components';
import Fieldset from '@src/components/common/Fieldset';
import Section from '@src/components/common/Section';
import Button from '@src/components/common/button/Button';
import UnderlineButton from '@src/components/common/button/UnderlineButton';
import Datepicker, {
  type Period,
} from '@src/components/common/input/Datepicker';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';
import StatusField from '@src/components/library/StatusField';
import PageField from '@src/components/library/PageField';

type Props = Partial<Record> &
  Pick<Book, 'itemPage'> &
  Partial<Pick<Book, 'isbn13'>>;

const RecordBottomsheet = ({
  isbn13,
  recordId,
  status: defaultStatus = 'UNREAD',
  startDate: defaultStartDate,
  endDate: defaultEndDate,
  currentPage: defaultCurrentPage,
  itemPage,
}: Props) => {
  const [status, setStatus] = useState<Record['status']>(defaultStatus);
  const [date, setDate] = useState<Period>({
    start: defaultStartDate ?? '',
    end: defaultEndDate ?? '',
  });
  const [currentPage, setCurrentPage] = useState<number>(
    defaultCurrentPage ?? 0,
  );

  const { closeModal: closeBottomsheet } = useModal(bottomsheetState);
  const { openModal: openDialog, closeModal: closeDialog } =
    useModal(dialogState);
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (recordId) {
      const { mutate: updateRecord } = usePatchRecord(recordId);
      updateRecord({
        body: { status, startDate: date.start, endDate: date.end, currentPage },
      });
    } else {
      const { mutate: createRecord } = usePostRecord();
      createRecord({
        body: {
          isbn13: isbn13 ?? '',
          status,
          startDate: date.start,
          endDate: date.end,
          currentPage,
        },
      });
    }

    closeBottomsheet();
  };
  const handleDeleteClick = () => {
    openDialog(
      <DeleteConfirmDialog
        onClickDelete={() => {
          if (recordId) {
            const { mutate: deleteRecord } = useDeleteRecord(recordId);
            deleteRecord();
          }
        }}
        closeDialog={() => {
          closeDialog();
          closeBottomsheet();
        }}
      />,
    );
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <StatusField
        name='status'
        defaultValue={defaultStatus}
        required
        setValue={setStatus}
      />
      <Fieldset as='fieldset' title='독서 기간'>
        <Section>
          <Datepicker
            type={status === 'READING' ? 'date' : 'period'}
            name='date'
            required
            value={date}
            setValue={setDate}
          />
        </Section>
      </Fieldset>
      <Fieldset as='fieldset' title='독서 현황'>
        <Section>
          <PageField
            name='currentPage'
            required
            value={currentPage}
            setValue={setCurrentPage}
            defaultValue={defaultCurrentPage ?? 0}
            itemPage={itemPage}
          />
        </Section>
      </Fieldset>
      <Button type='submit'>저장하기</Button>
      {recordId && (
        <UnderlineButton text='삭제하기' onClick={handleDeleteClick} />
      )}
    </Form>
  );
};

export default RecordBottomsheet;

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};

  padding: ${({ theme }) => `${theme.padding[24]} ${theme.padding[16]}`};
`;
