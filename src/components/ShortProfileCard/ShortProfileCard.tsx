import { Avatar, Card, Stack, Typography } from '@mui/material';
import { IProfile } from '../../store/types';
import { motion } from 'motion/react';
import React, { ForwardedRef, forwardRef, RefObject } from 'react';
import { useDragControls } from 'motion/react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
interface ShortProfileCardProps {
  profile: IProfile;
}

const MotionCard = motion(
  React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Card>>((props, ref) => (
    <Card ref={ref} {...props} />
  )),
);

export const ShortProfileCard = (props: ShortProfileCardProps) => {
  const { profile } = props;
  const name = `${profile.firstName} ${profile.lastName}`;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: profile.id,
    data: profile,
  });

  return (
    <MotionCard
      sx={{
        px: 2,
        py: 1,
        transform: transform ? CSS.Translate.toString(transform) : null,
      }}
      /*   whileDrag={{ scale: 1.1 }} */
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <Stack direction={'row'} gap={1} alignItems={'center'}>
        <Avatar src={profile.avatar} alt={profile.firstName} />
        <Typography>{name}</Typography>
      </Stack>
    </MotionCard>
  );
};
