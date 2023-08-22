import * as React from "react";
import Image from "./Image";
import { graphql, useFragment, useQueryLoader } from "react-relay";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import Hovercard from "./Hovercard";
import PosterDetailsHovercardContents, { PosterDetailsHovercardContentsQuery } from "./PosterDetailsHovercardContents";
import type { PosterDetailsHovercardContentsQuery as HoverContentsQuery } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
export type Props = {
  poster: PosterBylineFragment$key
};

const PosterByLineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    name
    id
    profilePicture { 
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`;

export default function PosterByline({ poster }: Props): React.ReactElement {
  if (poster == null) {
    return null;
  }


  const data = useFragment(
    PosterByLineFragment,
    poster
  )

  const hoverRef = React.useRef(null);
  const [hoverCardQueryRef, loadHoverCard] = useQueryLoader<HoverContentsQuery>(PosterDetailsHovercardContentsQuery)
  
  const onBeginHover = () => {
    loadHoverCard({posterId: data.id})
  }

  return (
    <div className="byline" ref={hoverRef}>
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
      <Hovercard targetRef={hoverRef} onBeginHover={onBeginHover}>
        <PosterDetailsHovercardContents 
          queryRef={hoverCardQueryRef}
        />
      </Hovercard>
    </div>
  );
}
