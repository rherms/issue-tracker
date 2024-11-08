import { WarningTwoIcon } from '@chakra-ui/icons';
import { Priority } from '../const';
import { Issue } from '../Issue';

export function renderPriority(priority: Issue['priority']): JSX.Element {
  return (
    <>
      {priority}
      {priority === Priority.High && <WarningTwoIcon ml="2" color="orange" />}
    </>
  );
}
