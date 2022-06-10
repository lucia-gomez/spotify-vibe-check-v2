import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FastAverageColor from 'fast-average-color';

const fac = new FastAverageColor();

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  height: 30vh;
  max-height: 500px;
  min-height: 340px;
  padding: 24px;
  background: linear-gradient(transparent 0,rgba(0,0,0,.5) 100%), ${props => props.avgColor};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlaylistImage = styled.img`
  height: 192px;
  width: 192px;
  object-fit: cover;
  object-position: center center;
  box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
  margin-right: 24px;

  @media only screen and (max-width: 576px) {
    margin-right: 0px;
  }
`;

const PlaylistTitle = styled.h1`
  margin: 0px;
  font-size: 72px;
  line-height: 72px;

  @media only screen and (max-width: 576px) {
    font-size: 40px;
    line-height: 40px;
  }
`;

const PlaylistDescription = styled.p`
  margin: 0px;
  color: #ffffffb3;
  padding: 15px 0px;
`;

const MetadataRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h5, p {
    margin: 0px;
  }
`;

const MetadataDivider = styled.span`
  font-size: 1.2em;
  ::before {
    content: '•';
    margin: 0px 4px;
  }
`;

export default function PlaylistVibe({ playlist }) {
  const [avgColor, setAvgColor] = useState();

  useEffect(() => {
    fac.getColorAsync(playlist.images[0]?.url).then(c => {
      setAvgColor(c.hex);
    });
  }, [playlist.images]);

  return (
    <Header avgColor={avgColor}>
      <Wrapper>
        <PlaylistImage src={playlist.images[0]?.url} />
        <div>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          <PlaylistDescription>{playlist.description}</PlaylistDescription>
          <MetadataRow>
            <h5>{playlist.owner.display_name}</h5>
            <MetadataDivider />
            <p>{playlist.tracks.total} songs</p>
          </MetadataRow>
        </div>
      </Wrapper>
    </Header>
  )
}