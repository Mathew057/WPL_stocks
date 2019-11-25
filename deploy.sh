##!/usr/bin/env bash
set -e
export KUBE_NAMESPACE="default"
if ! [ -x "$(command -v helm)" ]; then
  echo "could not find helm installation"
  exit 1
fi

if ! [ -x "$(command -v kubectl)" ]; then
  echo "could not find kubectl installation"
  exit 1
fi

if [[ -z "$(kubectl config view)" ]]; then
  echo "There is no kubeconfig setup."
  exit 1
fi

cd charts

export CHART_PATH="./hodl"

helm lint $CHART_PATH
helm dep update $CHART_PATH

export RELEASE_NAME="hodl"
export DEPLOYS=$(helm ls -n "$KUBE_NAMESPACE"| grep $RELEASE_NAME | grep "deployed" --ignore-case | wc -l)
export FAILS=$(helm ls -n "$KUBE_NAMESPACE"| grep $RELEASE_NAME | grep "failed" --ignore-case | wc -l)

if [ ${FAILS} -ne 0 ]; then
  helm ls --all --short | xargs -L1 helm delete -n "$KUBE_NAMESPACE"
fi

GITHUB_USER="mathew057"
GITHUB_TOKEN="5978bedf38ae9d606c5223d670b45d01f9866c6b"

if [[ -z "$(kubectl get secrets | grep github-token)" ]]; then
  echo "creating docker registery secret"
  kubectl create secret docker-registry github-token --docker-server=https://docker.pkg.github.com --docker-username=$GITHUB_USER --docker-password=$GITHUB_TOKEN --docker-email=mathew0057@gmail.com
fi

if [ ${DEPLOYS}  -eq 0 ]; then
  echo "Creating helm deployment"
  helm install ${RELEASE_NAME} $CHART_PATH -n "$KUBE_NAMESPACE" \
    --set imagePullSecret=github-token
else
  echo "Upgrading helm deployment"
  helm upgrade ${RELEASE_NAME} $CHART_PATH -n "$KUBE_NAMESPACE" \
    --set imagePullSecret=github-token
fi
