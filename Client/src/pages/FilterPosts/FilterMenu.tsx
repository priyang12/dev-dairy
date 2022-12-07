import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Skeleton,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useGetProjects } from '../../API/ProjectAPI';
import useForm from '../../Hooks/useForm';
import { IProject } from '../../interface';
import MetaFilterPosts from '../../Meta/MetaFilterPosts';

type FilterTypes = {
  title: string;
  project: string;
  status: string;
  date: string;
};

function FilterMenu({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useSearchParams();
  const { data: Projects, isLoading: LoadingProject } = useGetProjects({
    select: '-roadMap',
  });

  const CurrentFilter = search.get('filter')
    ? (JSON.parse(search.get('filter') as string) as FilterTypes)
    : null;

  const { FormValues, ErrorsState, HandleChange } = useForm({
    title: CurrentFilter?.title || '',
    project: CurrentFilter?.project || '',
    status: CurrentFilter?.status || '',
    date: CurrentFilter?.date || '',
  });

  const SubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = Object.fromEntries(
      Object.entries(FormValues).filter(([_, v]) => v != ''),
    );
    setSearch(`filter=${JSON.stringify(query)}`);
    onClose();
  };
  return (
    <Box
      position="relative"
      top="0"
      right="0"
      w="100%"
      p={10}
      my={10}
      rounded="xl"
      bg="primary.700"
    >
      <MetaFilterPosts
        description={`Posts after Filter applied 
        ${search?.get('filter')?.split(',')}`}
      >
        <meta
          name="keywords"
          content={`${search?.get('filter')?.split(',')}`}
        />
      </MetaFilterPosts>
      <form onSubmit={SubmitFilter}>
        <FormControl>
          <FormLabel htmlFor="title" spellCheck>
            Title
          </FormLabel>
          <Input
            type="text"
            name="title"
            id="title"
            value={FormValues.title}
            onChange={HandleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="project">Project</FormLabel>
          {LoadingProject ? (
            <Skeleton>
              <div>Loading Projects</div>
            </Skeleton>
          ) : (
            <Select
              mb={2}
              name="project"
              id="project"
              value={FormValues.project}
              onChange={HandleChange}
            >
              <option value="">Select Project</option>
              {Projects?.map((project: IProject) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </Select>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="status">status</FormLabel>
          <Select
            mb={2}
            name="status"
            id="status"
            onChange={HandleChange}
            defaultValue={FormValues.status}
          >
            <option value="">Select Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In-Process">In-Process</option>
            <option value="Started">Started</option>
            <option value="Done">Done</option>
          </Select>
        </FormControl>
        <Button
          backdropFilter="auto"
          backdropBlur="10px"
          type="submit"
          colorScheme="green"
          variant="outline"
          w="100%"
          ml="auto"
        >
          Filter Logs
        </Button>
      </form>
    </Box>
  );
}

export default FilterMenu;
