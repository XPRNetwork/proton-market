import { ReactNode, useState } from 'react';
import Image from 'next/image';
import {
  Container,
  Row,
  Column,
  ImageContainer,
  Title,
  ContentRow,
  ArrowContainer,
  ToggleContainer,
  Divider,
} from './DetailsLayout.styled';
import SalesHistoryTable from '../SalesHistoryTable';
import AssetFormTitle from '../AssetFormTitle';
import { Sale } from '../../services/sales';

type Props = {
  children: ReactNode;
  image: string;
  templateId: string;
  templateName: string;
  collectionName: string;
  collectionAuthor: string;
  sales: Sale[];
  error?: string;
  assetId?: string;
};

const AssetImage = ({ image }: { image: string }): JSX.Element => (
  <ImageContainer>
    <Image
      priority
      layout="responsive"
      width={456}
      height={470}
      src={`https://ipfs.io/ipfs/${image}`}
    />
  </ImageContainer>
);

const DetailsLayout = ({
  children,
  image,
  templateId,
  templateName,
  collectionName,
  collectionAuthor,
  sales,
  error,
  assetId,
}: Props): JSX.Element => {
  const [salesTableActive, setSalesTableActive] = useState(true);
  return (
    <Container>
      <Row>
        <AssetImage image={image} />
        <Column>
          <AssetFormTitle
            templateName={templateName}
            collectionName={collectionName}
            collectionAuthor={collectionAuthor}
          />
          <Divider />
          {children}
        </Column>
      </Row>
      <ContentRow>
        <Title>Recent Sales History</Title>
        <ArrowContainer
          isActive={salesTableActive}
          onClick={() => setSalesTableActive(!salesTableActive)}>
          <Image
            priority
            layout="fixed"
            width={24}
            height={24}
            src="/arrow.svg"
            alt="Dropdown Arrow"
          />
        </ArrowContainer>
      </ContentRow>
      <ToggleContainer active={salesTableActive}>
        <SalesHistoryTable tableData={sales} error={error} assetId={assetId} />
      </ToggleContainer>
    </Container>
  );
};

export default DetailsLayout;
