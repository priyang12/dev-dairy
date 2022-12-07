import { Profiler } from 'react';
import type { ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions,
) => {
  console.log(phase, actualDuration, baseDuration, startTime, commitTime);
  console.log(interactions);

  console.log(
    'XxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxX',
  );
};

function ProfilerComponent({
  options,
  children,
  id,
}: {
  options?: ProfilerOnRenderCallback;
  children: React.ReactNode;
  id: string;
}) {
  if (!options) return null;
  return (
    <Profiler onRender={options} id={id}>
      {children}
    </Profiler>
  );
}

ProfilerComponent.defaultProps = {
  options: onRenderCallback,
};

export default ProfilerComponent;
