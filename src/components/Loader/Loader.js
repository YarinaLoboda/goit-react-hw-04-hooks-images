import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const Container = styled.div`
   {
    display: flex;
    margin: 15px;
    justify-content: center;
  }
`;

export default function SpinnerLoader() {
  return (
    <Container>
      <Loader type="Grid" color="#3f51b5" height={100} width={100} />
    </Container>
  );
}
