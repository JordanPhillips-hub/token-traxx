import { Swiper } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css/bundle";

type CarouselProps = {
  children: React.ReactNode;
};

export default function Carousel({ children }: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={16}
      slidesPerView={6}
      navigation={true}
    >
      {children}
    </Swiper>
  );
}
