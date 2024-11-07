import React, { useCallback } from 'react';
import { CreateIssueParams } from '../../IssueContext';
import { FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import { Priority } from '../../const';

interface NewIssueFormProps {
  createParams: CreateIssueParams;
  updateParams: (newParams: CreateIssueParams) => void;
}

export const NewIssueForm = React.memo(function NewIssueForm(props: NewIssueFormProps) {
  const { createParams, updateParams } = props;

  const handleTitleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      updateParams({ ...createParams, title: evt.currentTarget.value });
    },
    [createParams, updateParams],
  );

  const handleDescriptionChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateParams({ ...createParams, description: evt.currentTarget.value });
    },
    [createParams, updateParams],
  );

  const handlePriorityChange = useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      updateParams({ ...createParams, priority: evt.currentTarget.value as CreateIssueParams['priority'] });
    },
    [createParams, updateParams],
  );

  return (
    <Stack spacing="4">
      <FormControl isInvalid={createParams.title === ''}>
        <FormLabel>Title</FormLabel>
        <Input type="text" value={createParams.title} onChange={handleTitleChange} />
        {createParams.title === '' && <FormErrorMessage>Title is required.</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={createParams.description === ''}>
        <FormLabel>Description</FormLabel>
        <Textarea value={createParams.description} onChange={handleDescriptionChange} />
        {createParams.description === '' && <FormErrorMessage>Description is required.</FormErrorMessage>}
      </FormControl>

      <FormControl>
        <FormLabel>Priority</FormLabel>
        <Select value={createParams.priority} onChange={handlePriorityChange}>
          <option value={Priority.Low}>{Priority.Low}</option>
          <option value={Priority.Medium}>{Priority.Medium}</option>
          <option value={Priority.High}>{Priority.High}</option>
        </Select>
      </FormControl>
    </Stack>
  );
});
