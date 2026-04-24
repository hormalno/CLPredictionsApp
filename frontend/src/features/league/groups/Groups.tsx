import { mockGroups } from '../../../mocks';
import Group from '../../group/Group';

const Groups = () => {
  return (
    <>
        {mockGroups.map((group) => (
            <Group key={group.name} group={group} />
        ))}
    </>
    );
};

export default Groups;