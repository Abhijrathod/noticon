/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import {
  Aside as AsideUI,
  loadTheme,
  toggleTheme,
  Switch,
  Content,
  colors,
  Icon,
  Modal,
} from 'notion-ui';
import { useStore, observer } from '../../stores';
import { copyText } from '../../libs/utils';
import UploadIcon from '../UploadIcon';
import Icons from '../Icon';
import { desktop } from '../../styles/mediaQuery';

export default observer(function Aside(): JSX.Element {
  const theme = loadTheme();
  const {
    icon: { recentUsedIcons, unshightOriginIcon },
  } = useStore();
  const modal = Modal.useModal();
  const [isDark, setIsDark] = useState(theme === 'Dark');
  const handleClick = useCallback((imgUrl: string) => {
    copyText(imgUrl);
  }, []);
  const handleToggleTheme = useCallback(() => {
    setIsDark(!isDark);
    toggleTheme();
  }, [setIsDark, isDark]);

  const handleOpenUploadModal = useCallback(() => {
    modal.openModal({
      title: 'New Icon',
      contents: (
        <UploadIcon
          closeModal={modal.close}
          unshightIcon={unshightOriginIcon}
        />
      ),
    });
  }, [modal]);

  return (
    <AsideFlex>
      <AsideUI.Group title="Recent Used" max={5}>
        {recentUsedIcons.map((recentUsedIcon) => (
          <AsideUI.Menu
            key={recentUsedIcon.id}
            title={recentUsedIcon.title}
            handleClick={() => handleClick(recentUsedIcon.imgUrl)}
            iconUrl={recentUsedIcon.imgUrl}
          />
        ))}
      </AsideUI.Group>
      <Content.Spacing size={20} />

      <BottomMenus>
        <UploadMenu
          title={'New Icon'}
          handleClick={handleOpenUploadModal}
          icon={<Icon icon="add" />}
        />
        <Content.Spacing size={20} />
        <ThemeMenu onClick={handleToggleTheme}>
          <Content.Text as="P" color={colors.grey60}>
            Dark mode
          </Content.Text>
          <Switch switchOn={isDark} />
        </ThemeMenu>
        <GithubMenu
          title={'Github'}
          handleClick={() =>
            window.open('https://github.com/tmmoond8/noticon.git', '_blank')
          }
          icon={<Icons.Github />}
        />
      </BottomMenus>
    </AsideFlex>
  );
});

const ThemeMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  padding: 2px 14px;
  &:hover {
    background-color: ${colors.grey08};
  }
  &:active {
    background-color: ${colors.grey16};
  }
  cursor: pointer;
`;

const AsideFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const GithubMenu = styled(AsideUI.Menu)`
  flex-basis: 45px;
  svg {
    width: 18px;
    ${desktop(css`
      width: 18px;
    `)}
  }
`;

const UploadMenu = styled(AsideUI.Menu)`
  flex-basis: 45px;
  box-shadow: ${colors.grey08} 0px -1px 0px;
`;

const BottomMenus = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
`;
