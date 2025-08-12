import FadeInCard from "@/components/FadeInCard";
import FlipCard from "@/components/FlipCard";
import GestureCard from "@/components/GestureCard";
import RotateCard from "@/components/RotateCard";
import ScaleCard from "@/components/ScaleCard";
import SlideCard from "@/components/SlideCard";

const animationCards = [
  {
    key: "fade",
    label: "Fade In",
    instruction: "This card fades in when loads.",
    Component: FadeInCard,
    title: "Memories from Brooklyn",
    image: "https://picsum.photos/200",
  },
  {
    key: "scale",
    label: "Scale Animation",
    instruction: "This card scales up when it loads.",
    Component: ScaleCard,
    title: "Moments",
    image: "https://picsum.photos/300",
  },
  {
    key: "rotate",
    label: "Rotate",
    instruction: "It rotate when it loads.",
    Component: RotateCard,
    title: "Jungle Book",
    image: "https://picsum.photos/400",
  },
  {
    key: "slide",
    label: "Slide In",
    instruction: "This card slides in when renders.",
    Component: SlideCard,
    title: "Sliding",
    image: "https://picsum.photos/500",
  },
  {
    key: "flip",
    label: "Flip",
    instruction: "This card flips when it loads.",
    Component: FlipCard,
    title: "I Flip",
    image: "https://picsum.photos/300",
  },
  {
    key: "gesture",
    label: "Gesture Expand/Collapse",
    instruction: "Use a gesture to expand or collapse the card.",
    Component: GestureCard,
    title: "Swipe Up and Down",
    image: "https://picsum.photos/400",
  },
];

export default animationCards;
