import { Container, Stack, Typography } from '@mui/material';
import { useGetAllProfileQuery } from '../../store/services/profileSlice';
import { ShortProfileCard } from '../../components/ShortProfileCard/ShortProfileCard';
import { useState } from 'react';
import { motion } from 'motion/react';
import React from 'react';
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';

const DragComtainer = motion(
  React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Stack>>((props, ref) => {
    console.log({ ref });
    return <Stack ref={ref} {...props} />;
  }),
);
const UsersPage = () => {
  const [isDropped, setIsDropped] = useState(false);
  const { data: profiles } = useGetAllProfileQuery(undefined);
  const { isOver, setNodeRef } = useDroppable({
    id: 'dropable',
  });
  const { isOver: isOver1, setNodeRef: setNodeRef1 } = useDroppable({
    id: 'dropable-1',
  });

  function handleDragEnd(event: DragEndEvent) {
    console.log('Drag End:');
    console.log('Active ID:', event.active.id);
    console.log('Over ID:', event.over ? event.over.id : 'null');
    console.log(`over: `, event.over, event.active);
    if (event.over && event.over.id === 'dropable') {
      setIsDropped(true);
    }
  }
  console.log({ isOver });
  return (
    <Container sx={{ height: 1 }}>
      <Typography variant="h4">User:</Typography>
      <DndContext onDragEnd={handleDragEnd}>
        <div
          ref={setNodeRef}
          style={{
            width: '100%',
            height: '500px',
            background: isOver ? 'green' : 'blue',
            padding: 2,
            pointerEvents: 'auto',
          }}
        >
          {profiles?.map((profile) => <ShortProfileCard key={profile.id} profile={profile} />)}
        </div>
        <div
          ref={setNodeRef1}
          style={{
            width: '100%',
            height: '500px',
            background: isOver1 ? 'blue' : 'green',
            padding: 2,
            pointerEvents: 'auto',
          }}
        ></div>
      </DndContext>
    </Container>
  );
};

export default UsersPage;
