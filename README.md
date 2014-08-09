Basic Synth
====

_An extension to the `<audio>` element for 8-bit music passed in as algorithm powered by [Mozilla X-Tag](http://x-tags.org/)._

## Idea

Inspired by a talk of [Manuel Ruelke](https://github.com/homecoded) at the JSUnconf 2014 about low-level sound-synthesis with the help of small algorithms, I built this extension to the `<audio>`-tag that takes the length in bytes and the song-algorithm via attributes. It then generates a Base64-encoded Wave-bytestring inside a WebWorker which is set as the source of the `<audio>`-tag.

The whole thing goes back to this article: [140bytes Music SoftSynth](http://www.p01.org/releases/140bytes_music_softSynth/).

## Installation

You need [NPM](https://www.npmjs.org/) and [Bower](http://bower.io/) installed on your computer. Then you can load **Basic Synth** by entering the following into your terminal:

```bash
$ bower install basic-synth
```

Afterwards you need to include the X-Tag-core script and the **Basic Synth** script into your page:

```html
…
<script src="/path/to/bower_components/x-tag-core/dist/x-tag-core.min.js"></script>
<script src="/path/to/bower_components/basic-synth/dist/basic-synth.min.js"></script>
…
```

## Usage

Now you're ready to include **Basic Synth** `<audio>`-tags into your page:

```html
<audio is="basic-synth"
  wav="(t<<3)*[8/9,1,9/8,6/5,4/3,3/2,0][[0xd2d2c8,0xce4088,0xca32c8,0x8e4009][t>>14&3]>>(0x3dbe4688>>((t>>10&15)>9?18:t>>10&15)*3&7)*3&7]&255"
  length="90000"
  controls>
```

The contents of the `wav`-attribute are eval'd while `t` represents the current byte. So the outcome of the algorithm changes over time — from byte to byte.

If you want to learn more about how to write these algorithms I recommend the article mentioned above — [140bytes Music SoftSynth](http://www.p01.org/releases/140bytes_music_softSynth/) — as well as the [js-synth](https://github.com/homecoded/js-synth/) repository by Manuel Rülke himself.

## How it works

**Basic Synth** takes the algorithm from the `wav`-attribute and passes it into a WebWorker that generates the Base64-encoded Wave-bytestring. The whole stuff gets eval'd, so be careful when you're using **Basic Synth**. Regarding the performance the evaluation of the algorithm is no problem. Or in other words: putting it into a WebWorker made the compiling like 1000 times faster!

## Browser support

I actually didn't test in all browsers. But one could say that it works in all modern browsers that support `Worker`, `Blob` and `URL`. Though there might be browsers that bristles. For instance Safari doesn't support `atob` and `btoa` in WebWorkers. That's why the compiling simply doesn't work. Other problems may or may not exist. Im' curious!

## Author

**Emanuel Kluge**

![Emanuel Kluge](https://2.gravatar.com/avatar/4f965f0d32998cdf5b3576241aff3929?d=https%3A%2F%2Fidenticons.github.com%2Ff84c85567eb0521955aa7e52fa14d260.png&r=x&s=120)

[Website](http://www.emanuel-kluge.de/)

[twitter](https://twitter.com/Herschel_R)

[Google+](https://plus.google.com/+EmanuelKluge)

## License

Copyright 2014 Emanuel Kluge

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.