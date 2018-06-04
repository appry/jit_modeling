function ran(min, max) {
  return Math.random() * (max - min) + min;
}

export function objective(model) {
  //console.log("objective called");
  let qr = [],
    qt = [],
    v = [];
  //начальные значения qt

  for (let t of model.transitionsArr) {
    qt.push(t.tau);
  }
  let it = 0;
  while (true) {
    for (let place of model.placesArr) {
      let max = -Number.MAX_VALUE;
      for (let keyT of place.inputs) {
        let tID = model.edges[keyT].nodeFrom;
        let t = model.nodes[tID];
        if (t.tau + t.time > max) {
          max = t.tau + t.time;
        }
      }
      place.tau = max;
      v.push(place.tau);
    }
    for (let t of model.transitionsArr) {
      let max = -Number.MAX_VALUE;
      for (let keyP of t.inputs) {
        let placeID = model.edges[keyP].nodeFrom;
        let place = model.nodes[placeID];
        if (place.tau > max) {
          max = place.tau;
        }
      }
      t.tau = Math.max(max, t.tau);
      qr.push(t.tau);
    }
    if (arraysEqual(qr, qt)) break;
    qt = qr.slice();
    qr = [];
    v = [];
  } // qr qt ----------------------

  let fz = 0;
  let count = 0;
  for (let t of model.transitionsArr) {
    for (let pa of t.productsArr) {
      let p = model.products[pa.product];
      for (let opt of pa.opt) {
        fz += (t.tau - opt.tau) * opt.amount * p.storagePrice; //??????
      }
    }
  }
  for (let edge of model.edgesArr) {
    let nodeFrom = model.nodes[edge.nodeFrom];
    let nodeTo = model.nodes[edge.nodeTo];
    for (let pa of edge.productsArr) {
      let p = model.products[pa.product];
      let temp = nodeTo.tau - nodeFrom.tau;
      fz += temp * pa.amount * p.storagePrice;
    }
  }
  for (let t of model.transitionsArr) {
    if (t.isFinal) {
      if (t.tau > 0) {
        fz += t.fee * (t.tau + t.time);
      } else {
        fz += t.storagePrice * (Math.abs(t.tau) + t.time);
      }
    }
  }
  return Math.round(fz * 1e2) / 1e2;
}

// ------------------------------------
// ------------------------------------
// ------------------------------------
// tau
function func(y, lambda, l) {
  return -Math.log(y) / lambda - l;
}

function objectiveAverage(model, l, samplesCount) {
  let samples = [];
  for (let i = 0; i < samplesCount; i++) {
    let count = 0;
    for (let transition of model.transitionsArr) {
      let maxTau = 0;
      for (let pa of transition.productsArr) {
        for (let opt of pa.opt) {
          opt.tau = func(ran(0, 1), 1 / opt.supply.time, l[count++]);
          if (opt.tau > maxTau) maxTau = opt.tau;
        }
      }
      transition.tau = maxTau;
    }
    samples.push(objective(model));
  }
  let avg = 0;
  for (let sample of samples) {
    avg += sample;
  }
  return Math.round(avg / samples.length * 1e2) / 1e2;
}

export function genetic(model, len, size, parentsToMate) {
  let startTime = new Date();
  let chromosomes = [];
  for (let i = 0; i < size; i++) {
    chromosomes.push(randomArray(len));
  }
  let maxIts = 100;
  let its = 0;
  let samples = 500;
  if (parentsToMate > size) {
    parentsToMate = size;
  }
  let chromosomeHashes = {};
  while (its < maxIts) {
    chromosomes.sort((a, b) => {
      let aVal, bVal;
      if (chromosomeHashes[a]) {
        aVal = chromosomeHashes[a];
      } else {
        aVal = objectiveAverage(model, a, samples);
        chromosomeHashes[a] = aVal;
      }
      if (chromosomeHashes[b]) {
        bVal = chromosomeHashes[b];
      } else {
        bVal = objectiveAverage(model, b, samples);
        chromosomeHashes[b] = bVal;
      }
      return aVal - bVal;
    });
    let children = [];
    for (let i = 0; i < parentsToMate - 1; i++) {
      for (let j = i + 1; j < parentsToMate; j++) {
        children = children.concat(
          createChildren(chromosomes[i], chromosomes[j])
        );
      }
    }
    chromosomes = chromosomes.concat(children);
    chromosomes.sort((a, b) => {
      let aVal, bVal;
      if (chromosomeHashes[a]) {
        aVal = chromosomeHashes[a];
      } else {
        aVal = objectiveAverage(model, a, samples);
        chromosomeHashes[a] = aVal;
      }
      if (chromosomeHashes[b]) {
        bVal = chromosomeHashes[b];
      } else {
        bVal = objectiveAverage(model, b, samples);
        chromosomeHashes[b] = bVal;
      }
      return aVal - bVal;
    });
    chromosomes = chromosomes.slice(0, size);
    its++;
    let endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    if (timeDiff > 10) break;
  }
  console.log(objectiveAverage(model, chromosomes[0], samples));
  return chromosomes[0];
}

//промежуточная рекомбинация
function createChildren(parent1, parent2) {
  const mutationProb = 0.1;
  let child1, child2;
  child1 = parent1.map(
    (el, index) => el + ran(-0.25, 1.25) * (parent2[index] - el) * ran(1, 5)
  );
  child2 = parent2.map(
    (el, index) => el + ran(-0.25, 1.25) * (parent1[index] - el) * ran(1, 5)
  );
  let mut = ran(0, 1);
  if (mut < mutationProb) mutate(child1);
  mut = ran(0, 1);
  if (mut < mutationProb) mutate(child2);
  return [child1, child2];
}

// Отбор усечением
function mutate(chrom) {
  let index = Math.floor(ran(0, chrom.length));
  let min = Number.MAX_VALUE,
    max = -Number.MAX_VALUE;
  for (let gene of chrom) {
    if (gene < min) min = gene;
    if (gene >= max) max = gene;
  }
  let sign = ran(0, 1);
  if (sign < 0.5) chrom[index] += (min + max) / 2;
  else chrom[index] -= (min + max) / 2;
}

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function randomArray(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(ran(-0.1, 0.1));
  }
  return arr;
}
