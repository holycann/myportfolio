import {
  BrowserMockup,
  PhoneMockup,
  WindowMockup,
} from "@/components/device-mockups";
import { Project } from "@/types/Project";

export const ProjectMockup = (
  item: Project,
  handleImageClick: (item: Project) => void,
  mockupType: "phone" | "window" | "browser",
  orientation: "vertical" | "horizontal" = "vertical"
) => {
  if (item.images && item.images.length > 0) {
    const images = item.images.map((img) => ({
      src: img.src,
      alt: img.alt,
    }));

    const thumbnail = item.images.find((img) => img.is_thumbnail) || images[0];

    switch (mockupType) {
      case "phone":
        return (
          <PhoneMockup
            thumbnail={thumbnail}
            imageCarousel={images}
            title={item.title}
            onImageClick={() => handleImageClick(item)}
            orientation={orientation}
          />
        );
      case "window":
        return (
          <WindowMockup
            images={images}
            onImageClick={() => handleImageClick(item)}
            url={item.web_url}
          />
        );
      case "browser":
        return (
          <BrowserMockup
            images={images}
            onImageClick={() => handleImageClick(item)}
            url={item.web_url}
          />
        );
      default:
        return null;
    }
  }

  return <p className="text-white text-center">No Images Available</p>;
};
