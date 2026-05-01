async function test() {
  try {
    const res = await fetch('http://localhost:3000/blog/ai-cfo-revolution-systematize');
    console.log('Status:', res.status);
    if (res.status === 200) {
      console.log('Success - Local server found the post!');
    } else {
      console.log('Error - Local server returned:', res.status);
    }
  } catch (e) {
    console.log('Failed to connect to local server:', e.message);
  }
}
test();
