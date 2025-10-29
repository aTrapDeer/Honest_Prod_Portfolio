# Using S3-Hosted Videos as Backgrounds in Next.js

This guide explains the pattern used in `src/app/page.js` to display full-screen video backgrounds that stream directly from an S3 (or CloudFront) URL. It then shows how to adapt the same approach for **any** bucket—illustrated with the example object `s3://taylor-construction/ConstructionBRoll.mp4`.

---

## 1. How the Current Implementation Works

### Snippet from `src/app/page.js`
```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
>
  <source src="https://dj57pv4qm04lm.cloudfront.net/BG2.mp4" type="video/mp4" />
</video>
```
Key points:
1. **Direct HTTPS URL** – The `<source>` tag points to a publicly-accessible CloudFront URL that fronts an S3 object.
2. **Playback flags** – `autoPlay`, `muted`, `loop`, and `playsInline` enable seamless background playback without user interaction.
3. **Absolute positioning** – The wrapper fills the viewport (`absolute inset-0 w-full h-full`) so the video sits behind all content.
4. **Styling / overlay** – Tailwind classes and an additional overlay `<div>` tame brightness and allow smooth fade-in/out transitions via React state.

> ℹ️  No SDK, signed URLs, or credentials are required because the object is publicly readable through CloudFront.

---

## 2. Preparing Your Own S3 Video

Follow these steps for **any** new video you want to stream, using `s3://taylor-construction/ConstructionBRoll.mp4` as the concrete example.

1. **Upload the file to S3**  
   - Bucket: `taylor-construction`  
   - Key: `ConstructionBRoll.mp4`
2. **Set permissions**  
   - Easiest: mark the object **public-read**.  
   - Preferred: create a CloudFront distribution with an origin access control, then expose the video via the distribution.
3. **Get the HTTPS URL**  
   - Public object: `https://taylor-construction.s3.amazonaws.com/ConstructionBRoll.mp4`  
   - CloudFront example: `https://d1234abcd.cloudfront.net/ConstructionBRoll.mp4`
4. **(Optional) Add CORS**  
   - If you notice CORS errors, add a simple CORS rule allowing `GET` from `*` on the bucket.

---

## 3. Dropping the New Video into Your Code

Replace only the `<source>` line. Everything else (styling, overlay, state-driven opacity) stays unchanged.

```diff jsx
- <source src="https://dj57pv4qm04lm.cloudfront.net/BG2.mp4" type="video/mp4" />
+ <source src="https://taylor-construction.s3.amazonaws.com/ConstructionBRoll.mp4" type="video/mp4" />
```

If you are using CloudFront, swap in the CloudFront URL instead of the S3 one for better performance.

### Full Minimal Example
```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
>
  <source src="https://taylor-construction.s3.amazonaws.com/ConstructionBRoll.mp4" type="video/mp4" />
</video>
```

---

## 4. Tips & Best Practices

1. **Compression** – Use `h.264` + `AAC` MP4 files; compress with `ffmpeg` to balance quality vs. size.
2. **Mobile Data** – Consider a lighter fallback image for mobile users on metered connections.
3. **Poster Attribute** – Add `poster="/path/to/placeholder.jpg"` to show a still before the video buffers.
4. **Lazy Start** – If the page has multiple backgrounds, load only the first video immediately and defer others until scrolled into view.
5. **Cache Invalidation** – When you upload a new version to the same key, invalidate the CloudFront cache so users get the fresh video.

---

## 5. Checklist for New Projects

- [ ] Upload video to S3
- [ ] Verify public read or CloudFront distribution
- [ ] Copy the HTTPS URL
- [ ] Paste into the `<source>` tag in your Next.js component
- [ ] Test across Chrome, Safari, Firefox, and mobile

Share this guide with any teammate who needs to integrate S3-hosted videos as seamless backgrounds.

---

© Honest Prod Co – internal documentation 