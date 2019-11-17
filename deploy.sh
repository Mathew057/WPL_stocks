##!/usr/bin/env bash
if ! [ -x "$(command -v helm)" ]; then
  echo "could not find helm installation"
  exit 1
fi

if [[ -z "$KUBECONFIG" ]]; then
  echo "There is no kubeconfig setup."
  exit 1
fi

helm lint ./helm
helm dep update ./helm
helm install ./helm
