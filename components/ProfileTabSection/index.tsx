import { memo } from 'react';
export { ProfileTabSectionItems } from './ProfileTabSectionItems';
export { ProfileTabSectionCreations } from './ProfileTabSectionCreations';
import PaginationButton from '../PaginationButton';
import Grid from '../Grid';
import EmptyUserContent from '../EmptyUserContent';
import { ProfileTabsProps } from '../ProfileTabs';
import { Template } from '../../services/templates';
import { PAGINATION_LIMIT, CARD_RENDER_TYPES } from '../../utils/constants';

export interface ProfileTabSectionContainerProps extends ProfileTabsProps {
  chainAccount: string;
}

type Props = {
  showNextPage: () => Promise<void>;
  isLoadingPrices: boolean;
  isFetching: boolean;
  rendered: Template[];
  prefetchPageNumber: number;
  emptyContent: {
    subtitle: string;
    buttonTitle: string;
    link: string;
  };
};

const ProfileTabSection = ({
  showNextPage,
  isLoadingPrices,
  isFetching,
  rendered,
  prefetchPageNumber,
  emptyContent,
}: Props): JSX.Element => {
  const getSectionContent = () => {
    if (!rendered.length) {
      const { subtitle, buttonTitle, link } = emptyContent;
      return (
        <EmptyUserContent
          subtitle={subtitle}
          buttonTitle={buttonTitle}
          link={link}
        />
      );
    }

    return (
      <Grid
        type={CARD_RENDER_TYPES.TEMPLATE}
        isLoadingPrices={isLoadingPrices}
        items={rendered}
      />
    );
  };

  return (
    <>
      {getSectionContent()}
      <PaginationButton
        onClick={showNextPage}
        isLoading={isFetching}
        isHidden={isFetching || prefetchPageNumber === -1}
        disabled={isFetching || rendered.length < PAGINATION_LIMIT}
        autoLoad
      />
    </>
  );
};

ProfileTabSection.defaultProps = {
  showNextPage: () => {},
  isLoadingPrices: false,
  isFetching: true,
  rendered: [],
  prefetchPageNumber: -1,
  emptyContent: {
    subtitle: '',
    buttonTitle: '',
    link: '',
  },
};

export default memo(ProfileTabSection);
