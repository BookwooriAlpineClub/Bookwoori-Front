import { NoDataTextLayout } from '@src/styles/Layout';
import Header from '@src/components/common/Header';

const ClimbingPreparePage = ({ name: headerText }: { name: string }) => {
  return (
    <NoDataTextLayout>
      <Header text={headerText} headerType='back' />
      <main>
        <strong>아직 클라이밍 기간이 아니에요.</strong>
      </main>
    </NoDataTextLayout>
  );
};

export default ClimbingPreparePage;
