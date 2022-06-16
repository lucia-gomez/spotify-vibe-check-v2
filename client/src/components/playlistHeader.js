import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FastAverageColor from 'fast-average-color';

var rgb = require('hsv-rgb');
var hsv = require('rgb-hsv');
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
  width: 100%;
  display: flex;
  align-items: flex-end;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
    align-items: unset;
    /* align-items: center; */
  }
`;

const PlaylistImageWrapper = styled.div`
  display: flex;
  justify-content: center;
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
    margin-bottom: 20px;
  }
`;

const PlaylistTitle = styled.h1`
  margin: 0px;
  font-size: 72px;
  margin-bottom: 12px;
  text-overflow: ellipsis;
  overflow: hidden;

  @media only screen and (max-width: 576px) {
    font-size: 30px;
  }
`;

const PlaylistDescription = styled.p`
  margin: 0px;
  color: #ffffffb3;
  padding: 15px 0px;

  @media only screen and (max-width: 576px) {
    padding: 0px;
    margin-bottom: 5px;
  }
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
      const [r, g, b] = c.value;
      let [h, s, v] = hsv(r, g, b);
      s = Math.min(100, s + 20);
      const rgbColorBright = rgb(h, s, v);
      setAvgColor(`rgb(${rgbColorBright.join(',')})`);
    });
  }, [playlist.images]);

  return (
    <Header avgColor={avgColor}>
      <Wrapper>
        <PlaylistImageWrapper>
          <PlaylistImage src={playlist.images[0]?.url} />
        </PlaylistImageWrapper>
        <div>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          {playlist.description && <PlaylistDescription>{playlist.description}</PlaylistDescription>}
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