export function productImageSrc(image: string) {
    if (image.startsWith("http") || image.startsWith("/")) {
        return image;
    }

    return `/img/products/${image}`;
}
