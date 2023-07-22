import { gql, useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';

const GET_OWNER = gql`
  query GetOwner($id: String!) {
    position(id: $id) {
      owner
    }
  }
`;

interface QueryComponentProps {
  id: string;
}

export default function QueryComponent({ id }: QueryComponentProps) {
  const { loading, error, data } = useQuery(GET_OWNER, {
    variables: { id },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error! {error.message}</Typography>;

  // Convert JSON data to a string
  const dataString = JSON.stringify(data, null, 2);

  return (
    <Box sx={{ p: 2, bgcolor: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Success
      </Typography>
      <Box sx={{ bgcolor: 'grey.500', p: 2, borderRadius: 2, color: 'white' }}>
        <Typography variant="body1">
          {dataString}
        </Typography>
      </Box>
    </Box>
  );
}
