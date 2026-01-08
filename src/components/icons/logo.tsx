import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image
        src="https://i.postimg.cc/MZdk3ryn/270833480-140534175031119-2361686743964558044-n.jpg"
        alt="Pet Protect Outfitters Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="font-bold text-lg hidden sm:inline-block">
        Pet Protect Outfitters
      </span>
    </div>
  );
}
