import React, { useCallback, useState } from 'react';
import { faBars, faComments } from '@fortawesome/free-solid-svg-icons';

import Box from '../Box';
import VisuallyHidden from '../VisuallyHidden';
import { Media } from '../Media';
import Icon from '../Icon';
import Logo from '../Logo';

import MainMenu from './MainMenu';
import { useMapState } from '../MapState';
import { useRouter } from 'next/router';
import Button from '../Button';

import dynamic from 'next/dynamic';
import { useFeedbackPopover } from './hooks';
import Text from '../Text';

// const Feedback = dynamic(() => import('../Feedback/Feedback'));
const Drawer = dynamic(() => import('../Drawer'));

const Header = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const router = useRouter();
  const [, setMapState] = useMapState();
  const navigateAway = useCallback(() => {
    setMapState({ searchLocation: undefined, focus: undefined });
    router.push('/');
  }, [router, setMapState]);

  const { feedbackPopoverId, handleClick, FeedbackPopover } =
    useFeedbackPopover();

  return (
    <Box as="header">
      <Box
        display="flex"
        alignItems="center"
        px={[3, 4]}
        py={2}
        bg="white"
        minHeight={'60px'}
      >
        <Box flexShrink={0}>
          <Button
            role="link"
            onClick={navigateAway}
            variant="link"
            aria-label="Navigate to the home page"
          >
            <Logo />
          </Button>
        </Box>

        <Box as="nav" width="100%" aria-labelledby="menu-main">
          <h2 id="menu-main">
            <VisuallyHidden>Main menu</VisuallyHidden>
          </h2>

          <Media at="sm" css={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              aria-describedby={feedbackPopoverId}
              onClick={handleClick}
              variant={'link'}
            >
              <Icon icon={faComments} size="2x" />
              <VisuallyHidden>
                <Text>Feedback</Text>
              </VisuallyHidden>
            </Button>

            <Box ml={4}>
              <button
                type="button"
                aria-expanded={isMenuVisible}
                onClick={() => setIsMenuVisible(!isMenuVisible)}
              >
                <VisuallyHidden>Toggle main menu</VisuallyHidden>
                <Icon icon={faBars} size="2x" />
              </button>
            </Box>

            <FeedbackPopover />

            <Drawer visible={isMenuVisible} zIndex={200}>
              <MainMenu onMenuItemClick={() => setIsMenuVisible(false)}>
                {children}
              </MainMenu>
            </Drawer>
          </Media>

          <Media greaterThan="sm">
            <MainMenu>{children}</MainMenu>
          </Media>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
