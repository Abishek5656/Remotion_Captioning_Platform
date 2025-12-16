import { Container } from "@mui/material";
// import VideoUploader from "../components/Upload/VideoUploader";
import VideoUploader from "../components/upload/VideoUploader";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <VideoUploader />
    </Container>
  );
}
