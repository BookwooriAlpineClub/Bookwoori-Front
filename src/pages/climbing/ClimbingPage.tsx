import ClimbingProgressPage from '@src/pages/climbing/ClimbingProgressPage';
// import ClimbingTerminatePage from '@src/pages/climbing/ClimbingTerminatePage';

enum ClimbingState {
  READY = 'READY',
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
  FAILED = 'FAILED',
}

const ClimbingPage = () => {
  const state = 'FINISHED' as ClimbingState;

  return (
    <>
      {state === 'RUNNING' && <ClimbingProgressPage />}
      {(state === 'FINISHED' || state === 'FAILED') && (
        <h2>임시</h2>
      )}
    </>
  );
};

export default ClimbingPage;
